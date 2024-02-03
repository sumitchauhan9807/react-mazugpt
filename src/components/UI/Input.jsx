const Text = ({ type, onChange, placeholder = "", value }) => {
  return (
    <input
      className="pl-2 outline-none border-none"
      type="text"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};
const Password = ({ type, onChange, placeholder = "", value }) => {
  return (
    <input
      className="pl-2 outline-none border-none"
      type="password"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};

function Input(props) {
  if(props.type == 'text') return <Text {...props}/>
  if(props.type == 'password') return <Password {...props}/>
}

export default Input;
