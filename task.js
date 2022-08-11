import {execa} from 'execa';
import moment from 'moment';
import fs from 'fs';


const fileOP = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("count.txt", function(err, buf) {
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
  for (let j = 0; j < list.length; j++) {
    const y = list[j];
  let cal = moment(`${y}-01-01`);
  let days = 360;
  for (let i = 0; i < days; i++) {
    let date = cal.format('LLLL');
    for (let index = 0; index < i; index++) {
      await fileOP();
      await execa('git', ['add', '.']);
      await execa('git', ['commit', '-m', `a commit a day keeps your girlfriend away ${date}`]);
      await execa('git', ['push', '-f']);
      await execa('git', ['commit', '--amend', '--no-edit', "--date", date]);
      await execa('git', ['push', '-f']);
    }
    cal.add(1, 'days');
  }
}
})()