import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

export default function Queue() {
  return (
    <div >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Report</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>07:10 PM</TableCell>
            <TableCell>Jane Cooper</TableCell>
            <TableCell>New: Diabetes intake</TableCell>
            <TableCell>
              <Button variant="outline">Report</Button>
            </TableCell>
            <TableCell>
              <Button variant="default">Launch</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>07:45 PM</TableCell>
            <TableCell>Jenny Wilson</TableCell>
            <TableCell>New: Diabetes intake</TableCell>
            <TableCell>
              <Button variant="outline">Report</Button>
            </TableCell>
            <TableCell>
              <Button variant="default">Launch</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>08:20 PM</TableCell>
            <TableCell>Esther Howard</TableCell>
            <TableCell>Anxiety check in</TableCell>
            <TableCell>
              <Button variant="outline">Report</Button>
            </TableCell>
            <TableCell>
              <Button variant="default">Launch</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>08:55 PM</TableCell>
            <TableCell>Leslie Alexander</TableCell>
            <TableCell>Post-traumatic stress</TableCell>
            <TableCell>
              <Button variant="outline">Report</Button>
            </TableCell>
            <TableCell>
              <Button variant="default">Launch</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>10:00 PM</TableCell>
            <TableCell>Jacob Jones</TableCell>
            <TableCell>Schizophrenia</TableCell>
            <TableCell>
              <Button variant="outline">Report</Button>
            </TableCell>
            <TableCell>
              <Button variant="default">Launch</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
