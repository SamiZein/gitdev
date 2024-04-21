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
        if (languages?.length) {
            setTotalBytes(languages.reduce((acc, language) => acc + language.Bytes, 0));
        }
    }, [languages]);
    return (
        languages?.length && 
        <div className="flex flex-col items-center">
            <div className="flex w-full overflow-hidden rounded-full">
                {
                    languages.map((language) => (
                        <div
                            key={language.Name}
                            style={{ 
                                width: `${(language.Bytes / totalBytes) * 100}%`,
                                backgroundColor:  language.Color
                            }}
                        >
                            &nbsp;
                        </div>
                    ))
                }
            </div>
            
            <div className="flex flex-wrap w-2/3">
                {
                    languages.map((language) => (
                        <div className="flex justify-center flex-grow"
                            key={language.Name}
                        >
                            <div className="rounded-full"
                                style={{backgroundColor:  language.Color}}
                            >
                                &nbsp;
                            </div>
                            <div className="text-xs">{language.Name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
        
    );
}