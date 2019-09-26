# SSSS (Seoul Store Style Sheet)

[![Build Status](https://travis-ci.org/seoulstore/ssss.svg?branch=master)](https://travis-ci.org/seoulstore/ssss)
[![devDependencies Status](https://david-dm.org/seoulstore/ssss/dev-status.svg)](https://david-dm.org/seoulstore/ssss?type=dev)
 
### 준비물

* Ruby 2.4.1
* Bundler 1.16.0
* gulp

### 개발방법

CSS 수정은 가급적 변수를 변경하세요. 만약 직접 수정해야 한다면 scss 디렉토리에서 시작하면 됩니다.
_gh_pages 디렉터리는 github.io의 정적 웹의 베이스가 될 디렉터리입니다.

> - 개발시 도커 컨테이너 이용
>```
>$ docker-compose up
>```

* `gulp serve`
  * scss watch
  * jekyll build
  * browser sync
  * 개발시 사용하세요.
  
* `gulp build`
  * 지킬을 이용한 정적 웹을 만듭니다.
  * 컨캣, 미니파이, 어글리파이 등등
  * docs 디렉터리를 베이스로 _gh_page 디렉터리를 만들어요.
---
### Appendix
  * `Travis-CI` `SSSS` 에서 사용되는 `GH_TOKEN` 값은 개인 계정으로 만들어 사용했었는데 `system@dunit.kr` 계정 거로 생성하여 변경 하였음.
  * `bootstrap.css`의 내용이 변경 될 경우 웹앱의 `bootstrap.css`도 변경 해주세요.
  * `gh-pages` 브랜치는 특별하게 따로 손 댈 일이 없을 것 같아요. `master` 브랜치에 변경 사항이 적용 될 경우 알아서 처리합니다. ([deploy.sh 참고](https://github.com/seoulstore/ssss/blob/master/deploy.sh))
  * 그리고 해당 리포는 퍼블릭이라 [트래비스닷오알쥐](https://travis-ci.org)로 가셔서 확인 하셔야 함.
---

### Changelogs

#### 2019-09-26
* 개발 docker image 추가

#### 2019-07-12 
* scons 추가.

#### 2018-01-24 
* Components -> Object Alignment 추가 ([SSSS Page](http://ssss.seoulstore.com/components/#object-alignment))
* 요소들의 세로 정렬을 맞추기 위한 class 작성

#### 2018-01-22
* _gh_pages 디렉토리 .gitignore에 등록 (_gh_pages 디렉토리는 로컬 개발할 때만 사용하세요.)
* `gh-pages` 브랜치가 github.io의 정적 웹의 베이스입니다.

#### Previous

* 문서는 master의 docs 디렉토리를 보도록 변경
* ssss.seoulstore.com CNAME 레코드 추가
* gulp (watch, jekyll build, browser sync) 추가 (2017-09-11 [scjang](https://github.com/scjang))

---

### Questions
  * ssss build 하고 docs/dist/css 경로에 있는 bootstrap.css 파일을  ss프로젝트로 옮기는게 맞나요?
    * 네 맞아요. `gulp build` task를 확인해보시면 알 수 있습니다.

