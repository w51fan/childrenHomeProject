<template>
  <div>
    <div>{{newsTitle}}</div>
    <div v-html="newsContent"></div>
  </div>
</template>

<script>
import { getNewsDetail } from "@/api/home";
export default {
  name: "newsDetail",
  data() {
    return {
      newsTitle: "",
      newsContent: `“文明创建•大爱邵东”第468——505场活动暨第267——304堂父母成长课程第八堂课于2019年11月26日晚上8点在邵东市留守儿童关爱家长微信群里开课，共38个村家长微信群的家长参与听课.此次课程是由李兆良老师分享《孩子的关爱(下)》。",
↵	<img src="https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAQiaTxNM8DS6GKM0geDwID3Q5fTuzaGPiagicqnnITmURhLoNicr1EcZH5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"></img>,
↵	"以下是家长学习接龙排行榜,家长学习个人积分排名及优秀家长听后心得分享:",
↵	"1.接龙排行榜",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAQiaMaWibQI9S93hxIQ1ia5JPlnia3Oib4TuNtxia1e5Rdgwo6dmxRxcyOOmA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAzGJ5Nu2rvQ1gU87wTWQgQhCfpQggFKb7fARBgv7VmXXhLRKIhTEmDg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAfxMdoZNtNIp4E4oQEzBDQRUZoJL3slWjWoSHQFXmXibYx8Nar7GnkXQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"2.家长学习个人积分排行",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtA47ibO39UmnrrBXfCsEZUdibR1uAEiccK0ickpWZpjQlQgbwn9rpFTjA4Kg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"3.课后优秀心得分享",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAiaU4jcSBKu8oibf4PNFYmKNHiatVStY0RkAChEfsQkkUv1tBy4Vvgw8pg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAZrLdNicDXjUCzZp6QY7levU0a9yHiahTQv8SoxCwlGCjJtLickfz7HDpw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAa2bz0VD29Ye8sFthEJrwZxsBqkw3YOGIv2ODdYaH0uAZichWZAzDKdA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtA1FZpiaLFA5oicHSkd1JYIHxJPP20YcF17j9X7DadMCEkVgY8F609WFfA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtA7W9ZsK2Zeb2e1PlJWd01a4H1ia9FwHHgfHXLQzmyxQUpGYqXCnI2ATg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAibfr5qZbdDBCI9nrbsibBG5icsiblLDqaLMPuxye2k0Ss4icTEukt8Xtib1w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAP4baw8ALqXqKs1F04E6XsCUfhSNdUk2DooEJueDictTOBMelMrxJSng/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtA3WdTHTASCgibicmS2lry0frrMjwGdJp6shn8nksayO2WRse5Pmn5KCQg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAG0icRZaxMMtc3VqUH6OPeFZYxLXKsOCwglf50EiaQOkRLaKvwzbkqReg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAXynUtTdQsQ2dNic3hZlIgR0whc5C4bYOEDZPibxxvibOmVcR1Il3GXavg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAso89EnyueuqoZdqpbsBOwMbae0P9qmsVmTNOvRPc5RNafoUolLrCyg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAU70Cc82y01K9Jibiah93ibIFPJRq0VBu6pjoXiclaL6v3z2rzdlGytaHCg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAZJsN5L1TtP3PLWnuP78OrGF5BKAIvakJA0vosjxKgjVVXlAEiamtZug/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtANPJxUzCHoeh5MCMoHAGxwGyxQ3ScUiaKiaZUwYGQCwCYyeFLH0vwNJ0A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAviakSDLeLoyrphXn9APYwejAiaET3MiaQkUqAwxxyjAibGU0htzo7LqcNQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAANqH5wOPL1d1dOlbh9AJ0rUS3GoOvNA9iaR9qxcrahKml96E81sUvVQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAmOOAq8FT9u8eElXupIicTT1Bw2REwvqHNElwCJrR6yNrafYyuCBuzBw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAN4k4s69OLO0ojXXq28p21LqmicthAXyCDibye0gtZaoABadiahBAicjXVw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAreNNuzRYvmVNbMibAia5HpCMCXTrTnqNsc8jwFHxMibUsyqCIExkuUcvw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtA2GSicEpRIQibeucy4N5F7BEibY7Uibp3SH5LlLUl8F8Fyyb39fz8z8uoOw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAo5maW4gPBFOcNicbpoENGXw3QMSdicNYl9RIJ0HqOibvv3ia84r6w2NgZA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"https://mmbiz.qpic.cn/mmbiz_jpg/bLzuVJh7LXysbaI3mWJmBJ1uA0G4NWtAz3B54AY9ZWSanAuEZgE2vB0jlOLWW23x6EMxq6CWeDAibDOz7gicXqvg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
↵	"家长好好学习",
↵	"孩子天天向上。",
↵	"希望更多的家庭受益。`
    };
  },
  mounted() {
    getNewsDetail(this.$route.query.Id).then(res => {
      console.log("res", res.data.news.Content);
      this.newsTitle = res.data.news.Title
      //   let temp = res.data.news.Content.split("<p>[");
      //   console.log("this.newsContent", temp);
      //   this.newsContent = temp[1].split("]")[0];
      //   console.log("this.newsContent", this.newsContent);
    });
  }
};
</script>

<style>
</style>