import { useEffect, useState } from "react";
import { getData } from "./Utils";

export default function UserLinguistics({className, githubID}) {
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
        <div className={`${className} flex flex-col items-center`}>
            <div className="flex justify-end w-full text-xs text-dark-text-secondary">
                <div className="mr-4">{totalBytes} bytes</div>
            </div>
            <div className="flex w-full h-2 overflow-hidden rounded-full">
                {
                    languages.map((language) => (
                        <div
                            key={language.Name}
                            style={{ 
                                width: `${(language.Bytes / totalBytes) * 100}%`,
                                backgroundColor:  language.Color
                            }}
                        />
                    ))
                }
            </div>
           

            <div className="flex flex-wrap w-2/3 space-x-2">
                {
                    languages.map((language) => (
                        <div className="flex items-center justify-center flex-grow space-x-1 text-xs" 
                            key={language.Name}
                        >
                            <div className="w-2 h-2 rounded-full"
                                style={{backgroundColor:  language.Color}}
                            />
                            <div>{language.Name}</div>
                            <div className="text-dark-text-secondary">{((language.Bytes / totalBytes) * 100).toFixed(1)}%</div>
                        </div>
                    ))
                }
            </div>
        </div>
        
    );
}