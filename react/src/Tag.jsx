export default function Tag({skill, index}) {
    return (
        <div 
            key={index}
            className="px-2 mx-1 text-xs bg-gray-400 rounded-full place-self-center"
        >
            {skill}
        </div>
    );
};