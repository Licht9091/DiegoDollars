export default function navigateAndReset(navi, screenName) {
    navi.reset({
      index: 0,
      routes: [{name: screenName}]
    })
  }