type HealingProgram = {
	name: string;
	count: number;
  };
  
  type Props = {
	programs: HealingProgram[];
  };
  
  export default function HealingProgramList({ programs }: Props) {
	return (
	  <div className="bg-white p-4 rounded-xl shadow">
		<h3 className="text-lg font-semibold mb-4 text-gray-800">🧘 힐링 프로그램 사용량</h3>
		<ul className="space-y-2">
		  {programs.map((program, index) => (
			<li key={index} className="flex justify-between text-base ml-2 text-gray-700">
			  <span>{index + 1}. {program.name}</span>
			  <span className="font-semibold mr-2">{program.count}회</span>
			</li>
		  ))}
		</ul>
	  </div>
	);
  }