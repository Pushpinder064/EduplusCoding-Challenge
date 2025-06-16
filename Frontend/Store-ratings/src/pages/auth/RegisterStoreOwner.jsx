import { useState } from "react";
import { registerStoreOwner } from "../../api/auth";


export default function RegisterStoreOwner() {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    await register(form, "store_owner");
    alert("Store owner registered!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register as Store Owner</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}
