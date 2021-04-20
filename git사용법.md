# Git 사용법 요약

## 리모트 저장소의 Refs 조회하기

```
$ git ls-remote origin
$ git remote show origin
```

## 2.3 Git의 기초 - 커밋 히스토리 조회하기

### 커밋 히스토리 조회하기

`git log`

```bash
$ git log
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number

```

`git log --pretty=format: "%h $s" --graph`

```bash
$ git log --pretty=format:"%h %s" --graph
* 2d3acf9 ignore errors from SIGCHLD on trap
*  5e3ee11 Merge branch 'master' of git://github.com/dustin/grit
|\
| * 420eac9 Added a method for getting the current branch.
* | 30e367c timeout code and tests
* | 5a09431 add timeout protection to grit
* | e1193f8 support for heads with slashes in them
|/
* d6016bc require time for xmlschema
*  11d191e Merge branch 'defunkt' into local

```
