import { useEffect, useState } from "react";
import { getData } from "./Utils";

export default function UserLinguistics({githubID}) {
    const [languages, setLanguages] = useState([]);
    const [totalBytes, setTotalBytes] = useState(0);
    useEffect(() => {
        getData("/v1/users/languages/"+githubID).then((data) => {
            setLanguages(data)
        });
    },[githubID])
    useEffect(() => {
        setTotalBytes(languages.reduce((acc, language) => acc + language.Bytes, 0));
    }, [languages]);
    return (
        languages?.length && 
        <div className="flex">
            {
                languages.map((language) => (
                    <div className="bg-red-500"
                        key={language.Name}
                        style={{ width: `${(language.Bytes / totalBytes) * 100}%` }}
                    >
                        &nbsp;
                    </div>
                ))
            }
        </div>
    );
}