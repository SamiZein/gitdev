export default function Button({onClick, text}){
    return (
        <button 
        onClick={onClick} 
        type="button"
        className="px-3 py-2 rounded-lg bg-dark-button text-dark-button-text hover:bg-dark-button-hover"
        >
            {text}
        </button>
    );
}