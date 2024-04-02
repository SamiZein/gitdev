
export default function RepoCount({count}) {
    return(
        <div className="relative text-lg font-bold ">
            <div >{count}</div>
            <div>Repos</div>
        </div>
    );
}