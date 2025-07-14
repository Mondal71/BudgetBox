import React from "react";
import Joyride from "react-joyride";

const Tour = ({ run, setRun }) => {
  const steps = [
    {
      target: "#income-card",
      content: "This shows your total income and upcoming earnings with real-time data.",
    },
    {
      target: "#expense-chart",
      content: "Visualize your expenses with interactive charts and category breakdown.",
    },
    {
      target: "#bills-widget",
      content: "Never miss a bill! Track upcoming payments and due dates here.",
    },
    {
      target: "#quick-actions",
      content: "Quick access to add income, expenses, bills, and set reminders.",
    },
    {
      target: "body",
      content: "💡 Pro tip: You can drag and resize these widgets to customize your dashboard layout!",
      placement: "center"
    }
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#66b2a3",
        },
      }}
      callback={(data) => {
        if (["finished", "skipped"].includes(data.status)) {
          setRun(false);
          localStorage.setItem("tourSeen", "true");
        }
      }}
    />
  );
};

export default Tour;
