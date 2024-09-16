import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";

export default function Messenger() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex">
            <CardTitle>Messenger</CardTitle>
            <Button variant="link" className="text-sm ml-auto">
              <div className="underline">Go to messenger</div>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="Marvin McKinney"
                    />
                    <AvatarFallback>MM</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Marvin McKinney</div>
                  <div className="text-sm text-muted-foreground">
                    Amet minim mollit non deserunt ullamco est...
                  </div>
                </TableCell>
                <TableCell>31/07/21</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="Cameron Williamson"
                    />
                    <AvatarFallback>CW</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Cameron Williamson</div>
                  <div className="text-sm text-muted-foreground">
                    Malesuada fermentum tortor...
                  </div>
                </TableCell>
                <TableCell>31/07/21</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="Leslie Alexander"
                    />
                    <AvatarFallback>LA</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Leslie Alexander</div>
                  <div className="text-sm text-muted-foreground">
                    Parturient venenatis etiam...
                  </div>
                </TableCell>
                <TableCell>31/07/21</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
