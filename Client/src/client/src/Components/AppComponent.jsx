function Application(props) {
    return (
    <div className="flex flex-col w-fit items-center my-2">
            <div className="border border-2 border-blue-600 p-3 w-fit rounded-2xl">{props.icon}</div>
            <p className="text-xs text-slate-500">{props.text}</p>
    </div>
    
    )
}
export default Application;