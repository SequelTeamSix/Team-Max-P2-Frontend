export default function Notification(props) {
  return (
    <div
      className="notification"
      onClick={() => props.clearNotification(props.id)}
    >
      <p>
        {props.date} | {props.action} | {props.position.name}
      </p>
    </div>
  );
}
