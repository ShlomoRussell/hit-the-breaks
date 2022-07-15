import { Key, useEffect } from "react";
import { useAccordionButton, Accordion, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { selectCurrentUser } from "../auth/authSlice";
import { useGetVacationFollowersQuery } from "./userVacationsApiSlice";

function CustomToggle({
  children,
  eventKey,
}: {
  children: JSX.Element;
  eventKey: string;
}): JSX.Element {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <span
      className="mt-"
      title="click to see who's following"
      style={{ cursor: "pointer" }}
      onClick={decoratedOnClick}
    >
      {children}
    </span>
  );
}

function FollowersAccordion({
  id,
  setIsFollowed,
}: {
  id: string;
  setIsFollowed: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { data: followers, isLoading } = useGetVacationFollowersQuery(id);
  const username = useSelector(selectCurrentUser);

  useEffect(() => {
    if (
      followers &&
      followers.find((f: { username: string }) => f.username == username)
    ) {
      setIsFollowed(true);
    } else setIsFollowed(false);
  }, [setIsFollowed, followers]);

  return (
    <>
      {isLoading ? (
        <div className="m-2">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Accordion className="mt-2">
          <CustomToggle eventKey="0">
            <strong> {`${followers ? followers.length : 0} following`}</strong>
          </CustomToggle>

          <Accordion.Collapse eventKey="0">
            {followers.length > 0 ? (
              <>
                <hr />
                {followers.map(
                  (f: { username: string }, i: Key): JSX.Element => (
                    <div key={i}>
                      {f.username == username ? "You" : f.username}
                    </div>
                  )
                )}
              </>
            ) : (
              <></>
            )}
          </Accordion.Collapse>
        </Accordion>
      )}
    </>
  );
}

export default FollowersAccordion;
