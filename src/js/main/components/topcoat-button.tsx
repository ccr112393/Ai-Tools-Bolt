interface TCButtonProps {
  text: string;
  onClick?: () => void;
}

function TCButton({ text, onClick }: TCButtonProps) {
  return (
    <button className="topcoat-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default TCButton;
