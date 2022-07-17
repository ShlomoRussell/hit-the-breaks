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


function Reports() {
  const isAdmin = useSelector(selectIsAdmin)
    const vacations = useSelector(selectAllVacations);
 
  const { data } = useGetReportsQuery(null);
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState<string[]>([]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
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
  const randomColorValue = () => Math.floor(Math.random() * 255);

  useEffect(() => {
      if (data) {
      setDatasets(
        data
          .filter(
            (cd: { destination: string; totalFollowers: number }) =>
              cd.totalFollowers > 0
          )
          .map((cd: { destination: string; totalFollowers: number }) => ({
            label: cd.destination,
            data: [cd.totalFollowers],
            backgroundColor: `rgb(${randomColorValue()},${randomColorValue()},${randomColorValue()})`,
          }))
        );
        setLabels(
          data.filter(
            (cd: { destination: string; totalFollowers: number }) =>
              cd.totalFollowers > 0
          ).map((cd: { destination: string; totalFollowers: number })=>cd.destination)
        );

    }

  }, [data, vacations]);
  const currentData = {
   labels,
    datasets,
  };
  return isAdmin ? (
    <div className="container">
    
      <Bar options={options} data={currentData} />
    </div>
  ) : (
    <NotFound />
  );
}

export default Reports;
