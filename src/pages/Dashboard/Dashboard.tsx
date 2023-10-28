import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card/card";

import Switch from "@/components/ui/switch/switch";

import CarLogo from "@/assets/toyota-logo.png";
import CarImg from "@/assets/car.png";
import {
  CarTypeIcon,
  DateIcon,
  GearIcon,
  LuggageIcon,
  SeatIcon,
  SeatTypeIcon,
} from "@/lib/icons";

type Car = {
  logo: string;
  title: string;
  carImg: string;
  details: CarDetail[];
  prices: CarPrice[];
};

type CarDetail = {
  icon: JSX.Element;
  title: string;
};

type CarPrice = {
  subtitle: string;
  title: string;
};

const cars: Car[] = [
  {
    logo: CarLogo,
    title: "Toyota Prado",
    carImg: CarImg,
    details: [
      {
        icon: <DateIcon />,
        title: "2022",
      },
      {
        icon: <SeatIcon />,
        title: "6+1",
      },
      {
        icon: <CarTypeIcon />,
        title: "SUV",
      },
      {
        icon: <SeatTypeIcon />,
        title: "Leather",
      },
      {
        icon: <GearIcon />,
        title: "Manual transmission",
      },
      {
        icon: <LuggageIcon />,
        title: "4",
      },
    ],

    prices: [
      {
        subtitle: "1-3 days",
        title: "50₼",
      },
      {
        subtitle: "3-15 days",
        title: "45₼",
      },
      {
        subtitle: "15-28 days",
        title: "40₼",
      },
      {
        subtitle: "28+ days",
        title: "35₼",
      },
    ],
  },
];

const Dashboard = () => {
  return (
    <div>
      {cars.map(({ logo, title, carImg, details, prices }, index) => (
        <Card key={index}>
          <CardHeader>
            <img src={logo} alt={title} className="logo" />
            <h3 className="title">{title}</h3>
          </CardHeader>

          <CardContent>
            <img src={carImg} className="car" alt={title} />

            <div className="details">
              {details.map(({ icon, title }, index) => (
                <div className="detail" key={index}>
                  {icon} <div className="title">{title}</div>
                </div>
              ))}
            </div>

            <div className="prices">
              {prices.map(({ subtitle, title }, index) => (
                <div className="price" title={title} key={index}>
                  <p className="subtitle">{subtitle}</p>
                  <p className="title">{title}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Switch />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
