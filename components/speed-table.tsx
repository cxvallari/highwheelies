import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"

const measurements = [
  {
    number: 1,
    licensePlate: "HW-1234",
    speed: "125 km/h",
    signal: "Radar A1",
    timestamp: "14:32:45",
  },
  {
    number: 2,
    licensePlate: "HW-5678",
    speed: "95 km/h",
    signal: "Radar A1",
    timestamp: "14:28:12",
  },
  {
    number: 3,
    licensePlate: "HW-9012",
    speed: "142 km/h",
    signal: "Laser B2",
    timestamp: "14:15:33",
  },
  {
    number: 4,
    licensePlate: "HW-3456",
    speed: "110 km/h",
    signal: "Radar A1",
    timestamp: "14:05:27",
  },
  {
    number: 5,
    licensePlate: "HW-7890",
    speed: "88 km/h",
    signal: "Laser B2",
    timestamp: "13:58:51",
  },
]

export function SpeedTable() {
  return (
    <div className="rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Targa</TableHead>
            <TableHead>Velocità</TableHead>
            <TableHead>Segnale</TableHead>
            <TableHead>Orario</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {measurements.map((measurement) => (
            <TableRow key={measurement.number}>
              <TableCell className="font-medium">{measurement.number}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{measurement.licensePlate}</div>
                </div>
              </TableCell>
              <TableCell>{measurement.speed}</TableCell>
              <TableCell>{measurement.signal}</TableCell>
              <TableCell>{measurement.timestamp}</TableCell>
              <TableCell>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
