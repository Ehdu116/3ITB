import Button from "react-bootstrap/Button";

export default function Buttons({ name, onClick, ...props }) {
  return (
    <section className="body__tableWrapper">
      <div className="body__container">
      <Button onClick={onClick} variant="primary" style={{ width: "auto", padding: "10px 20px" }}>
  {name}
</Button>

      </div>
    </section>
  );
}
