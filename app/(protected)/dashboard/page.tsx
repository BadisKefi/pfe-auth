const DashboardPage = () => {
  return (
    <>
      <div className="h-full overflow-y-auto flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">monitor website statistic!</p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
