
import {ControllerRenderProps} from "react-hook-form";


export default function FormElement({
    type,
    label,
    placeholder,
    fieldRef,
    hasError,
    }:{
    type: string;
    label: string;
    placeholder: string;
    fieldRef: ControllerRenderProps<
        { name: string; email: string; message:string},
        "name">;
    hasError: boolean;
})
{
    const classes= "from-control w-full px-9 py-1.5 text-grey-700 rounded border border-solid border-grey-300 focus:border-pink-600 foces:outline-none";
return (
    <div className="from-group">
        <label className="block text-gray-700 text-sm font-bold mb-2 ">{label}</label>
        {type === "textarea" ? (
            <textarea className={classes} {...fieldRef} placeholder={placeholder} />
        ) : (
            <input
                className={classes}
                {...fieldRef}
                type={type}
                placeholder={placeholder}
            />
        )}
        {hasError && (
            <p className="text-red-500 text-xs italic">{`${label} is required`}</p>
        )}
    </div>
)
}

