export default function Notification(props) {
  return (
    <div>
      <p>{props.action}</p>
      <p>{props.description}</p>
    </div>
  );
}
