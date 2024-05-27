export let reports = [];
export let reportsOffline = [];
export const addItemToReports = (item) => {

  if (!reports.includes(item)) {
    reports.push(item);

  }
};

export const addItemToReportsOffline = (item) => {

  if (!reportsOffline.includes(item)) {
    reportsOffline.push(item);
  }
};


export const transferOfflineRecipeToReports = () => {

  reportsOffline.forEach(item => {
    if (!reports.includes(item)) {
      reports.push(item);
    }
  });

  reportsOffline.length = 0;
};

