import runQuery from "../dal/dal.js";

async function getFollowerReports() {
  const sql = "CALL `GET_FOLLOWER_REPORT`()";
  try {
    const reports = await runQuery(sql);
    return reports.filter((data) => Array.isArray(data))[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export default getFollowerReports;
