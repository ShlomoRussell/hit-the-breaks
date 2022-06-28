import { dalGetFollowerReports } from "../dal/dal.js";

async function getFollowerReports() {
  try {
    const reports = await dalGetFollowerReports();
    return reports.filter((data) => Array.isArray(data))[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export default getFollowerReports;
