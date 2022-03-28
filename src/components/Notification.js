export default function Notification(props) {
  return (
    <div
      className="notification"
      onClick={() => props.clearNotification(props.id)}
    >
      <div className="notification-container">
        {props.date} | {props.action} | {props.position.name}
      </div>
    </div>
  );
}
