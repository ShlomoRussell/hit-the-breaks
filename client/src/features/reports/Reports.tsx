import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import NotFound from "../../components/NotFound";
import { selectIsAdmin } from "../auth/authSlice";
import { selectAllVacations } from "../vacations/usersVacationsSlice";
import { useGetReportsQuery } from "./reportsApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const isAdmin = useSelector(selectIsAdmin)
    const vacations = useSelector(selectAllVacations);
 
  const { data } = useGetReportsQuery(null);
  const [datasets, setDatasets] = useState([]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Current Vacations Followers Report",
      },
    },
  };
  const randomColor = () => Math.floor(Math.random() * 255);
  const labels = vacations.map((v) => v.destination);
  useEffect(() => {
      if (data) {
      setDatasets(
        data
          .filter(
            (cd: { vacationId: string; totalFollowers: number }) =>
              cd.totalFollowers>0
          )
          .map((cd: { vacationId: string; totalFollowers: number }) => ({
            label: vacations.find((v) => v.id)?.destination,
            data: cd.totalFollowers,
            backgroundColor: `rgb(${randomColor()},${randomColor()},${randomColor()})`,
          }))
      );
    }

  }, [data, vacations]);
  const currentData = {
    /*       labels, */
    datasets,
  };
  return isAdmin?  <Bar options={options} data={currentData} />:<NotFound/>;
}

export default Reports;
