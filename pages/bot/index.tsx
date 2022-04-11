import CustomError from "components/CustomError";
import Loader from "components/Loader";
import authorizedFetch from "queries/authorized-fetch";
import { useQuery } from "react-query";
import { EventType } from "types/opensea/EventType";

async function fetchEvents() {
  const response = await authorizedFetch(
    "/events?account_address=0x1022E8731677efC814b937FB0d1AFc83D9773b20"
  );
  return response.json();
}

export default function Bot() {
  const { data, error, isLoading } = useQuery<EventType>("events", fetchEvents);

  if (error) return <CustomError error={error as Error} />;
  if (isLoading ?? !data) return <Loader />;

  console.log(data);
  return (
    <div>
      <h1>Bot</h1>
    </div>
  );
}
