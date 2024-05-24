export let reports = [];

export const addItemToReports = (item) => {

  if (!reports.includes(item)) {
    reports.push(item);
    //console.log(reports)
  }
};
