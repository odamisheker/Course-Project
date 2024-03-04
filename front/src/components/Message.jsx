export default function Message({ data: { text, time, username } }) {
  /*
  TODO:
    time
    date
    maybe edit delete
  */
  return (
    <div>
      <p>
        {text}{" "}
        {new Date(time).toLocaleString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
