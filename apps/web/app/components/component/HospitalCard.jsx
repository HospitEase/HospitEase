import Link from "next/link";

export default function HospitalCard({ hospitalName, id }) {
  return (
    <Link href={`/hospitals/${id}`}>
      <div>
        <div className="pt-4 cursor-pointer">
          <div>
            <img
              src="/Photo3.jpg"
              className="rounded-2xl h-60"
              alt={`Image of ${hospitalName}`}
            />
          </div>
          <div className="pt-3">{hospitalName}</div>
          {/* <div className="pt-3">{hospitalAddress}</div> */}
        </div>
      </div>
    </Link>
  );
}
