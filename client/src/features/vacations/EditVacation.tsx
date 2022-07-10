import { useRef, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import { selectIsAdmin } from "../auth/authSlice";
import { useEditVacationMutation } from "./adminVacationsApiSlice";
import { selectAllVacations } from "./usersVacationsSlice";
import { Vacations } from "./vacations.interface";

function EditVacation() {
  const { vacationId } = useParams();
  const vacations = useSelector(selectAllVacations);
  const currentVacation = vacations.find((v) => v.id == vacationId)!;
  const isAdmin = useSelector(selectIsAdmin);
  const [updatedVacation, setUpdatedVacation] = useState<Partial<Vacations>>(
    {}
  );
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [edit] = useEditVacationMutation();
  const handleFileChange = (e: any) => {
    setSelectedFile([e.target.name, e.currentTarget.files[0], e.target.value]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(updatedVacation).forEach((kv) => formData.append(kv[0], kv[1].toString()));
    if (selectedFile) {
      formData.append(selectedFile[0],selectedFile[1],selectedFile[3])
    }
    console.log(formData.get('description'))
    try {
      edit({ id: currentVacation.id,vacation: formData });
    } catch (error) {
      console.log(error);
    }
  };
  return isAdmin ? (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "10px 10px 10px #888888",
        borderRadius: "10px",
        width: "90%",
      }}
      className="position-absolute top-50 start-50 translate-middle align-items-center p-5 pt-1  "
    >
      <Image className="mb-4 mx-auto d-block" fluid src="/hit_the_breaks.png" />
      <Form
        action="/api/vacations"
        method="put"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="destination">
          <Form.Label>
            Destination: <Form.Text>{currentVacation?.destination}</Form.Text>
          </Form.Label>
          <Form.Control
            onChange={(e) =>
              setUpdatedVacation({ destination: e.target.value })
            }
            type="text"
            name="destination"
            placeholder="edit destination"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>
            Description: <Form.Text>{currentVacation?.description}</Form.Text>
          </Form.Label>
          <Form.Control
            onChange={(e) =>
              setUpdatedVacation({ description: e.target.value })
            }
            type="text"
            name="description"
            placeholder="edit description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="startDate">
          <Form.Label>
            Start Date:{" "}
            <Form.Text>
              {new Date(currentVacation?.startDate).toLocaleString()}
            </Form.Text>
          </Form.Label>
          <Form.Control
            onChange={(e) =>
              setUpdatedVacation({ startDate: new Date(e.target.value) })
            }
            type="datetime-local"
            name="startDate"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>
            End Date:{" "}
            <Form.Text>
              {new Date(currentVacation?.endDate).toLocaleString()}
            </Form.Text>
          </Form.Label>
          <Form.Control
            onChange={(e) =>
              setUpdatedVacation({ endDate: new Date(e.target.value) })
            }
            type="datetime-local"
            name="endDate"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="picture">
          <Form.Label>
            Picture: <Form.Text>{currentVacation?.picture}</Form.Text>
          </Form.Label>
          <Form.Control
            onChange={handleFileChange}
            type="file"
            name="picture"
            placeholder="edit picture"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>
            Price: <Form.Text>{currentVacation?.price}</Form.Text>
          </Form.Label>
          <Form.Control
            onChange={(e) =>setUpdatedVacation({price:Number(e.target.value)})}
            type="number"
            step="any"
            min={1}
            name="price"
            placeholder="edit price"
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: "#48b42c" }}
          className="border-0"
          type="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  ) : (
    <NotFound />
  );
}

export default EditVacation;
