import { Button } from "../ui/button";

export default function Calendar() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Virtual visit</h2>
      <div className="bg-white p-4 rounded-md shadow-md mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-medium">August 2021</div>
          <Button variant="link" className="underline">
            View all
          </Button>
        </div>
        <div className="flex justify-between mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => (
              <div key={index} className="text-center">
                <div className="text-muted-foreground">{day}</div>
                <div
                  className={`mt-2 ${
                    index === 2 ? "bg-black text-white" : ""
                  } rounded-full w-8 h-8 flex items-center justify-center`}
                >
                  {30 + index}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
