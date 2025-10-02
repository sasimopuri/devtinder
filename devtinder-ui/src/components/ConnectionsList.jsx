import { DEFAULT_USER_IMG } from "../utils/constants";

const ConnectionsList = ({ connection }) => {
  const { firstName, lastName, gender, age, photoUrl, skills, description } =
    connection;
  return (
    <div className="flex justify-center items-center mt-2">
      <ul className="list bg-violet-100 rounded-box shadow-md w-2xl">

        <li className="list-row flex just">
          <div>
            <img
              className="size-34 rounded-box"
              src={photoUrl ? photoUrl : DEFAULT_USER_IMG}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1 font-bold text-2xl">
            <div>{firstName + " " + lastName}</div>
            <div className="text-xs font-semibold flex gap-3">
              <span>Age : {age}</span>
              <span>Gender : {gender[0].toUpperCase() + gender.slice(1)}</span>
            </div>
            <div className="text-xs font-semibold">
            </div>
            <div className="text-xs font-semibold">
              {description}
            </div>
            <div className="text-xs uppercase font-semibold">
              {skills}
            </div>
          </div>
          <p className="list-col-wrap text-xs"></p>
        </li>
      </ul>
    </div>
  );
};

export default ConnectionsList;
