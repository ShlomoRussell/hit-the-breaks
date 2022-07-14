import { useRef, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import { selectIsAdmin } from "../auth/authSlice";
import {
  useAddVacationsMutation,
  useEditVacationMutation,
} from "./adminVacationsApiSlice";
import { selectAllVacations } from "./usersVacationsSlice";
import { Vacations } from "./vacations.interface";

function EditOrAddVacation() {
  const { vacationId } = useParams();
  const location = useLocation();
  const vacations = useSelector(selectAllVacations);
  const currentVacation = vacations.find((v) => v.id == vacationId)!;
  const isAdmin = useSelector(selectIsAdmin);
  const [updatedVacation, setUpdatedVacation] = useState<Partial<Vacations>>(
    {}
  );
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [editVacation] = useEditVacationMutation();
  const [addVacation] = useAddVacationsMutation();
const isMobile = window.innerWidth < 800;

  const handleFileChange = (e: any) => {
    setSelectedFile([e.target.name, e.currentTarget.files[0], e.target.value]);
  };
  const isAdd = location.pathname.split("/")[2] === "add";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(updatedVacation).forEach((kv) =>
      formData.append(kv[0], kv[1].toString())
    );
    if (selectedFile.length > 0) {
      formData.append(selectedFile[0], selectedFile[1], selectedFile[3]);
    }
    try {
      if (isAdd) {
        addVacation(formData);
      } else editVacation({ id: currentVacation.id, vacation: formData });
    } catch (error) {
      console.log(error);
    }
  };
  return isAdmin ? (
    <div className="container ">
      <div className="row ">
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "10px 10px 10px #888888",
            borderRadius: "10px",
          }}
          className="mx-auto p-5 pt-1 col-sm-4"
        >
      <Image className="mb-4 mx-auto d-block" fluid src="/images/hit_the_breaks.png" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="destination">
          <Form.Label>
            Destination:{" "}
            {!isAdd && <Form.Text>{currentVacation?.destination}</Form.Text>}
          </Form.Label>
          <Form.Control
            required={isAdd ? true : false}
            onChange={(e) =>
              setUpdatedVacation({
                ...updatedVacation,
                destination: e.target.value,
              })
            }
            type="text"
            name="destination"
            placeholder="destination"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>
            Description:{" "}
            {!isAdd && <Form.Text>{currentVacation?.description}</Form.Text>}
          </Form.Label>
          <Form.Control
            required={isAdd ? true : false}
            onChange={(e) =>
              setUpdatedVacation({
                ...updatedVacation,
                description: e.target.value,
              })
            }
            type="text"
            name="description"
            placeholder="description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="startDate">
          <Form.Label>
            Start Date:{" "}
            {!isAdd && (
              <Form.Text>
                {new Date(currentVacation?.startDate).toLocaleString()}
              </Form.Text>
            )}
          </Form.Label>
          <Form.Control
            required={isAdd ? true : false}
            onChange={(e) =>
              setUpdatedVacation({
                ...updatedVacation,
                startDate: new Date(e.target.value),
              })
            }
            type="datetime-local"
            name="startDate"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>
            End Date:{" "}
            {!isAdd && (
              <Form.Text>
                {new Date(currentVacation?.endDate).toLocaleString()}
              </Form.Text>
            )}
          </Form.Label>
          <Form.Control
            required={isAdd ? true : false}
            onChange={(e) =>
              setUpdatedVacation({
                ...updatedVacation,
                endDate: new Date(e.target.value),
              })
            }
            type="datetime-local"
            name="endDate"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="picture">
          <Form.Label>
            Picture:{" "}
            {!isAdd && <Form.Text>{currentVacation?.picture}</Form.Text>}
          </Form.Label>
          <Form.Control
            required={isAdd ? true : false}
            onChange={handleFileChange}
            type="file"
            name="picture"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>
            Price:{!isAdd && <Form.Text>{currentVacation?.price}</Form.Text>}
          </Form.Label>
          <Form.Control
            required={isAdd ? true : false}
            onChange={(e) =>
              setUpdatedVacation({
                ...updatedVacation,
                price: Number(e.target.value),
              })
            }
            type="number"
            step="any"
            min={1}
            name="price"
            placeholder="price"
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: "#48b42c" }}
          className="border-0"
          type="submit"
        >
          {isAdd ? "Add" : "Update"}
        </Button>
      </Form>
        </div>
      </div>
      </div>
  ) : (
    <NotFound />
  );
}

export default EditOrAddVacation;
