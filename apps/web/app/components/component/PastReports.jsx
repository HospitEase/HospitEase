import { Card, CardContent } from "@/components/ui/card";

export default function PastReports() {
  return (
    <div>
      <section className="grid grid-cols-3 gap-4 mb-6">
        <Card className="col-span-1">
          <CardContent className="flex flex-col">
            <div>
              <div className="flex justify-start mt-4 mb-2">
                <UserIcon className="w-6 h-6 mr-2" />
                <div className="font-semibold">Patient</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mt-8">
                <div className="text-2xl font-bold">225</div>
                <div className="text-sm text-muted-foreground">
                  Last 30 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="flex flex-col">
            <div>
              <div className="flex justify-start mt-4 mb-2">
                <StethoscopeIcon className="w-6 h-6 mr-2" />
                <div className="font-semibold">Consultation</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mt-8">
                <div className="text-2xl font-bold">225</div>
                <div className="text-sm text-muted-foreground">
                  Last 30 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="flex flex-col">
            <div>
              <div className="flex justify-start mt-4 mb-2">
                <ClipboardIcon className="w-6 h-6 mr-2" />
                <div className="font-semibold">Report</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mt-8">
                <div className="text-2xl font-bold">225</div>
                <div className="text-sm text-muted-foreground">
                  Last 30 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function StethoscopeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
