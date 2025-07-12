// src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./admin.css"

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
  preferredDate: string;
  status: string;
}

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const snapshot = await getDocs(collection(db, "quotes"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Quote[];
      setQuotes(data);
    };

    fetchQuotes();
  }, []);

  return (
    <div className="mainContainer">
      <h1 className="">Submitted Quotes</h1>
      <div className="">
        <table className="table">
          <thead>
            <tr className="table_head">
              <th className="thData">Fullname</th>
              <th className="thData">Email</th>
              <th className="thData">Phone</th>
              <th className="thData">Service</th>
              <th className="thData">Notes</th>
              <th className="thData">Date</th>
              <th className="thData">Status</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id}>
                <td className="tbData">{quote.name}</td>
                <td className="tbData">{quote.email}</td>
                <td className="tbData">{quote.phone}</td>
                <td className="tbData">{quote.service}</td>
                <td className="tbData">{quote.notes}</td>
                <td className="tbData">{quote.preferredDate}</td>
                <td className="tbData">{quote.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
