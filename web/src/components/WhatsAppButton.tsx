import { ToolIcon } from "./ToolIcon";

export function WhatsAppButton({ number }: { number: string }) {
  const digits = number.replace(/\D/g, "");
  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <ToolIcon
        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/whatsapp.svg"
        color="#25D366"
        size={32}
      />
    </a>
  );
}

export default WhatsAppButton;
