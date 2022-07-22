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
  const list = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
  const index = Math.ceil(Math.random()*list.length)
  let cal = moment(`${list[index-1] || 2021}-01-01`)
  let days = 360;
  for (let i = 0; i < days; i++) {
    let date = cal.format('LLLL');
    await fileOP();
    await execa('git', ['add', '.']);
    await execa('git', ['commit', '-m', `a commit a day keeps your girlfriend away ${date}`]);
    await execa('git', ['push', '-f']);
    await execa('git', ['commit', '--amend', '--no-edit', "--date", date]);
    await execa('git', ['push', '-f']);
    cal.add(1, 'days');
  }
})()