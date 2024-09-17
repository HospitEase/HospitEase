import Link from "next/link";

export default function HospitalCard({ hospitalName, id }) {
  return (
    <Link href={`/hospitals/${id}`}>
      <div>
        <div className="pt-4 cursor-pointer">
          <div>
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-653962523645036913/original/f6eff0b6-e821-42a7-817d-bc6b603017f4.jpeg?im_w=720"
              className="rounded-2xl h-60"
              alt={`Image of ${hospitalName}`}
            />
          </div>
          <div className="pt-3">{hospitalName}</div>
        </div>
      </div>
    </Link>
  );
}
