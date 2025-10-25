import React from "react";
import "./Card.css";

const countries = [
  {
    name: "المغرب",
    capital: "الرباط",
    flag: "https://flagcdn.com/w320/ma.png",
    info: "المغرب بلد في شمال إفريقيا معروف بتنوعه الثقافي ومدن مثل مراكش وفاس.",
  },
  {
    name: "البرتغال",
    capital: "لشبونة",
    flag: "https://flagcdn.com/w320/pt.png",
    info: "البرتغال تقع في جنوب غرب أوروبا وتشتهر بتاريخها البحري وأطباق السمك.",
  },
  {
    name: "الولايات المتحدة الأمريكية",
    capital: "واشنطن العاصمة",
    flag: "https://flagcdn.com/w320/us.png",
    info: "الولايات المتحدة هي دولة كبيرة في أمريكا الشمالية، تتكون من 50 ولاية.",
  },
];

function Card() {
  return (
    <div className="card-container">
      {countries.map((country, index) => (
        <div className="card" key={index}>
          <img src={country.flag} alt={country.name} className="flag" />
          <h2>{country.name}</h2>
          <h3>العاصمة: {country.capital}</h3>
          <p>{country.info}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
