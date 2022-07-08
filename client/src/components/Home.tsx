import { Spinner } from "react-bootstrap";
import { useGetAllVacationsQuery } from "../features/vacations/userVacationsApiSlice";
import VacationsList from "../features/vacations/VacationsList";
import Header from "./Header";

function Home() {
  const { isLoading } = useGetAllVacationsQuery([]);
  return (
    <div className="h-100 " style={{ backgroundColor: "#f0f2f5" }}>
      <Header />
      {isLoading ? (
        <div className="position-relative vh-100">
          <Spinner
            animation="border"
            className="position-absolute top-50 start-50 translate-middle"
            role="status"
            variant="info"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <VacationsList />
      )}
    </div>
  );
}

export default Home;
