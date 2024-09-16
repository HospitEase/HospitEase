import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function CheckReport() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex">
            <CardTitle>Check report</CardTitle>
            <Button variant="link" className="ml-auto">
              <div className="underline">View all report</div>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new">
            <TabsList>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="earlier">Earlier</TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              <Table>
                <TableBody>
                  {[
                    {
                      name: "Floyd Miles",
                      date: "25/07/21",
                      type: "Blood glucose",
                    },
                    { name: "Cody Fisher", date: "11/07/21", type: "WISC" },
                    { name: "Jacob Jones", date: "02/06/21", type: "WAIS" },
                    {
                      name: "Wade Warren",
                      date: "Blood glucose",
                      type: "25/07/21",
                    },
                    {
                      name: "Jane Cooper",
                      date: "06/07/21",
                      type: "Bp & pulse rate",
                    },
                  ].map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>
                        <Button variant="default" size="sm">
                          Monitor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
