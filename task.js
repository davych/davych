import { execa } from 'execa';
import moment from 'moment';
import fs from 'fs';


const fileOP = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("count.txt", function (err, buf) {
      const count = parseInt(buf.toString());
      fs.writeFile("count.txt", `${count + 1}`, (err) => {
        console.log("Successfully Written to File.");
        resolve(true)
      });
    });
  })
}

await execa('git', ['config', '--local', 'user.email', "davych@163.com"]);
await execa('git', ['config', '--local', 'user.name', "davych"]);
(async () => {
  const list = [2022];
  let cal = moment(`2022-01-01`)
  let days = 360;
  const r = [
    '01-30',
    '01-30',
    '02-01',
    '02-02',
    '02-03',
    '02-04',
    '02-05',
    '01-26',
    '01-19',
    '01-20',
    '01-21',
    '01-22',
    '01-29'
  ]
  for (let i = 0; i < days; i++) {
    let date = cal.format('MM-DD');
    console.log(date);
    if (r.includes(date)) {
      await fileOP();
      await execa('git', ['add', '.']);
      await execa('git', ['commit', '-m', `a commit a day keeps your girlfriend away ${date}`]);
      await execa('git', ['push', '-f']);
      await execa('git', ['commit', '--amend', '--no-edit', "--date", date]);
      await execa('git', ['push', '-f']);
    }
    cal.add(1, 'days');
  }
})()