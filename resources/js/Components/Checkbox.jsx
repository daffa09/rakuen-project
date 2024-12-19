export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded bg-gray-900 border-gray-700 text-indigo-600 shadow-sm  focus:ring-indigo-600 focus:ring-offset-gray-800 " +
                className
            }
        />
    );
}
