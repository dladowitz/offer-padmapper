// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
var offerPad = angular.module('offerPad', []);

offerPad.factory('pusher', function($rootScope) {
  var pusher = new Pusher('265c8065bb95051d0a67');
  var channel = pusher.subscribe('long_lat_stream');

  Pusher.log = function(message) {
    if(window.console && window.console.log) {
      window.console.log(message);
    }
  };

  return {
    bind: function(event, callback) {
      channel.bind(event, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(channel, args);
        });
      });
    }
  };
});

offerPad.controller('MapCtrl', function($scope, $timeout, pusher) {
  var map;
  var us_center = new google.maps.LatLng(37.09024, -95.712891);
  $scope.icons = ["0a012ea3-4f68-47af-8bf8-d01443f6a918.png", "0a080930-5b82-453d-b9d6-aef87b76ae71.png", "0a190f56-1b09-4a69-a6b4-d22ef9e58ac1.png", "0a19c44a-53bb-494b-b229-66e4abf8d3f6.png", "0a1e0ad9-d097-4fd3-ab86-5a80779c1582.png", "0a29e8b3-206b-4c3e-aeec-e02e563198c2.png", "0a2fa131-0c49-47c7-be25-2baa11eddd1c.png", "0a3233fa-1639-420a-9ff5-9477117786c3.png", "0a354bd9-fe45-4eb3-91bd-ab1ab4f8c507.png", "0a459afa-002b-4a20-9f00-a898f680c546.png", "0a5ea6f8-92e7-44c7-ae6c-5013be17d8b7.png", "0a639569-a067-4b2b-856f-7a02460ccfb0.png", "0a71b36d-f33b-4507-8828-7da11c71e46d.png", "0a742fa3-2edf-41de-9619-65d277e4678d.png", "0a8486d2-d08b-406d-b561-7528955c5583.png", "0a8934b2-4a99-4512-b517-f778d5523faf.png", "0a950174-061a-4ad2-9391-8ce325ac1b22.png", "0ab0ffef-21b3-40fc-96d0-08eb502192b4.png", "0ab6c161-cee1-44b0-b2b0-f5870c4c9d5e.png", "0ab8c18a-9210-4d4a-a4db-f3559a0b7527.png", "0aebca07-7422-4602-b1fb-6ef236380b25.png", "0aef60ca-74cd-4970-ada9-5d893ad83cc2.png", "0af55d2c-65b6-4fcc-ae01-b7a8f0855b0c.png", "0b1290ef-7f90-4885-b9ef-47081f057f2d.png", "0b17e76e-9a49-42e2-aed4-d71cf50dd3f0.png", "0b2bb960-b03c-40e5-b67d-c288d42ff800.png", "0b5340d5-52a2-4302-b262-880ee1a27279.png", "0b66a656-25c6-41e3-9e93-a1ce34733436.png", "0b95b020-63c2-4857-a99f-64cc873f3861.png", "0ba12e31-a891-4262-bc40-7e68caf628eb.png", "0ba16ab9-75e9-4e66-baf0-377f2e2dc633.png", "0ba52b42-dfe3-408e-a740-6ff9277e9d62.png", "0bacdb8a-c4a2-462f-8a80-7aee34cdf0a8.png", "0bbb9537-268a-4a22-b0d2-2b098b35427f.png", "0bc01ed6-4bc3-49aa-99cd-d4cc5a0db212.png", "0be72e9e-620c-44df-84a9-5710db8ef015.png", "0bf12b35-57ca-4d83-945a-4bb761e09e86.png", "0bf2ff2a-06f8-40a1-b414-8b0b47b7f4fd.png", "0bf79932-1a80-4353-a024-7320cc0b5323.png", "0bf9ca72-8488-42f7-af31-f917b66f59e0.png", "0bfd47d2-e3bd-450c-b49b-0739ae8b8bc5.png", "0c0d3afd-69ee-4ec8-a0ac-3f62c039c8ea.png", "0c19ed14-9147-498c-9210-14107da5b77e.png", "0c3064d0-0e8b-432f-ad25-348df384650b.png", "0c6bef9a-9803-404e-a4cf-46a655794c67.png", "0c89fc26-7709-4f6a-99f0-07dca3e06d19.png", "0c92d30a-d77c-4ef7-83a5-7b58dcc73950.png", "0ca1ef08-0cb9-45f0-8abd-591d4cab04ea.png", "0cab92f2-44ec-4c10-a497-7d09643e681d.png", "0cbbb02c-1f65-4649-b2ef-69031a7e77a8.png", "0cc02f54-46cc-41dc-b59d-99ece03714ee.png", "0a012ea3-4f68-47af-8bf8-d01443f6a918.png", "0a080930-5b82-453d-b9d6-aef87b76ae71.png", "0a190f56-1b09-4a69-a6b4-d22ef9e58ac1.png", "0a19c44a-53bb-494b-b229-66e4abf8d3f6.png", "0a1e0ad9-d097-4fd3-ab86-5a80779c1582.png", "0a29e8b3-206b-4c3e-aeec-e02e563198c2.png", "0a2fa131-0c49-47c7-be25-2baa11eddd1c.png", "0a3233fa-1639-420a-9ff5-9477117786c3.png", "0a354bd9-fe45-4eb3-91bd-ab1ab4f8c507.png", "0a459afa-002b-4a20-9f00-a898f680c546.png", "0a5ea6f8-92e7-44c7-ae6c-5013be17d8b7.png", "0a639569-a067-4b2b-856f-7a02460ccfb0.png", "0a71b36d-f33b-4507-8828-7da11c71e46d.png", "0a742fa3-2edf-41de-9619-65d277e4678d.png", "0a8486d2-d08b-406d-b561-7528955c5583.png", "0a8934b2-4a99-4512-b517-f778d5523faf.png", "0a950174-061a-4ad2-9391-8ce325ac1b22.png", "0ab0ffef-21b3-40fc-96d0-08eb502192b4.png", "0ab6c161-cee1-44b0-b2b0-f5870c4c9d5e.png", "0ab8c18a-9210-4d4a-a4db-f3559a0b7527.png", "0aebca07-7422-4602-b1fb-6ef236380b25.png", "0aef60ca-74cd-4970-ada9-5d893ad83cc2.png", "0af55d2c-65b6-4fcc-ae01-b7a8f0855b0c.png", "0b1290ef-7f90-4885-b9ef-47081f057f2d.png", "0b17e76e-9a49-42e2-aed4-d71cf50dd3f0.png", "0b2bb960-b03c-40e5-b67d-c288d42ff800.png", "0b5340d5-52a2-4302-b262-880ee1a27279.png", "0b66a656-25c6-41e3-9e93-a1ce34733436.png", "0b95b020-63c2-4857-a99f-64cc873f3861.png", "0ba12e31-a891-4262-bc40-7e68caf628eb.png", "0ba16ab9-75e9-4e66-baf0-377f2e2dc633.png", "0ba52b42-dfe3-408e-a740-6ff9277e9d62.png", "0bacdb8a-c4a2-462f-8a80-7aee34cdf0a8.png", "0bbb9537-268a-4a22-b0d2-2b098b35427f.png", "0bc01ed6-4bc3-49aa-99cd-d4cc5a0db212.png", "0be72e9e-620c-44df-84a9-5710db8ef015.png", "0bf12b35-57ca-4d83-945a-4bb761e09e86.png", "0bf2ff2a-06f8-40a1-b414-8b0b47b7f4fd.png", "0bf79932-1a80-4353-a024-7320cc0b5323.png", "0bf9ca72-8488-42f7-af31-f917b66f59e0.png", "0bfd47d2-e3bd-450c-b49b-0739ae8b8bc5.png", "0c0d3afd-69ee-4ec8-a0ac-3f62c039c8ea.png", "0c19ed14-9147-498c-9210-14107da5b77e.png", "0c3064d0-0e8b-432f-ad25-348df384650b.png", "0c6bef9a-9803-404e-a4cf-46a655794c67.png", "0c89fc26-7709-4f6a-99f0-07dca3e06d19.png", "0c92d30a-d77c-4ef7-83a5-7b58dcc73950.png", "0ca1ef08-0cb9-45f0-8abd-591d4cab04ea.png", "0cab92f2-44ec-4c10-a497-7d09643e681d.png", "0cbbb02c-1f65-4649-b2ef-69031a7e77a8.png", "0cc02f54-46cc-41dc-b59d-99ece03714ee.png", "0d332533-9611-472e-acc7-ac6f4a3fcfc3.png", "0d539313-9bca-42ea-8167-a497a32479b2.png", "0d73226c-6db9-4d8c-be54-6144090f2213.png", "0d86baca-28fa-4d47-8390-9a857e7fbf90.png", "0da90aad-b122-41b9-a0f9-fa849b6fbfbd.png", "0daea5ac-61a8-4b39-a3b6-bc317743886f.png", "0db0d8a2-8cc2-45c0-9236-5d2699efd48c.png", "0db9646d-4713-41d2-b753-9631890b7ce5.png", "0dcc3e4c-0db8-4fce-b450-395f9ab7a05d.png", "0de09209-fab9-4ef3-b3cc-7025c66fa571.png", "0df3f1ff-0b52-4ded-a74e-ab2db31116a5.png", "0df8816e-8e29-448a-99ef-5aec62de80b7.png", "0dfbe2c8-5b08-458c-86c9-fa8c0e3f0a1b.png", "0e02d7c3-f537-45ea-be01-95798ebb5fb3.png", "0e123346-0c37-4d0a-8888-0efbc1658ccf.png", "0e1b056a-2973-424e-84ca-6878e35d59ad.png", "0e2f56e0-db4b-44b8-8101-65bc0c6dd791.png", "0e341fc0-d9a5-4aa7-85a2-2f2abc4ed6d7.png", "0e4ab01a-7553-4ea7-b4ec-b642b680e2ea.png", "0e61b97b-7e74-4749-bf2b-ea997e78a3c7.png", "0e64251f-7c1e-4815-a469-19a5d1064510.png", "0e7b37e5-0a43-4a53-90d2-f511ca1d3093.png", "0e7c6e04-61cd-417e-8856-02d6864b3d63.png", "0e82bc3c-2588-4837-8ba7-b75c5e4bc812.png", "0e8bde83-a8a5-4dfe-8b34-50eda3c17e0a.png", "0e8c24f8-b212-4362-8087-5606a5af7d8e.png", "0e914a77-b596-4ec0-8c1b-fc1194d17664.png", "0e99bbf7-5b9f-43cd-86b4-35e7febf305a.png", "0eb8c87f-476e-42d9-86cf-b24c15e71141.png", "0f120f82-cb0d-4a39-ab1d-0737d9e81690.png", "0f21f221-b4ad-4592-bce5-1f38f797b3f5.png", "0f3021f9-068d-4f5b-8e24-04bb3ff5f5aa.png", "0f35f818-6bf1-48b7-95bf-3af46d73b580.png", "0f44c121-d4e5-453e-9984-6d9ecdab3f05.png", "0f4e625a-3f6f-4ea0-908e-7f3dc581a3b3.png", "0f607d12-8d62-413a-b78c-ef5a755405a0.png", "0f791872-31ec-4b8e-a519-779983a3ea1a.png", "0f7e93dd-eaad-494f-b4a0-1a073e2228c9.png", "0f87dbc3-78a8-4467-8b6c-c3bf35d8bb86.png", "0f897a05-36f5-4eaa-8d0d-0892bc53b9d0.png", "0f91008e-ae30-4f75-9cb8-4bdfbc16a74a.png", "0fa65cf5-a866-44e6-b137-c201de8aae5c.png", "0fac625e-57dc-47ce-9b05-a0be0a7d4ff0.png", "0fb08c7a-d0fa-4df2-8df2-98a2fae9502c.png", "0fbab8d6-73ff-44b2-b252-75d6f7eee354.png", "0fbe58c9-7329-4813-8cdf-04cc21abbd11.png", "0fc6cff7-e7ef-400c-bcfe-bda6f9ee81a2.png", "0fd33f9d-5edf-4377-941c-3b93e5814f39.png", "0fd74bdd-2046-475e-b1ce-aa272584ba60.png", "0fdac91d-3dc8-40b9-9f39-71e62bdfaf22.png", "0fe2b0a4-83f6-4611-8e8d-4673e0f6314f.png", "1a1cceae-628e-4765-bfbd-5f99948a3653.png", "1a1f243c-d83a-4e3c-a64b-e33d6cf22f34.png", "1a248df7-aed9-4080-8ec0-2672cdd3ceab.png", "1a25e6ac-e3dc-4c60-951a-a7476f5eae9a.png", "1a34012f-218c-4365-b40b-3cfc0d920e55.png", "1a3b230b-c212-45e3-9d93-123a198a3963.png", "1a5358e9-5876-4e1e-97b5-8e06fac5d0c7.png", "1a8f18aa-55a4-4cc5-90e1-fdf966397c41.png", "1ac7ee9a-3df5-4bf1-8528-1e41534a107d.png", "1adcd3be-e4c7-410a-acf4-5cde3a40cfd7.png", "1af9ab9c-be22-4f99-a4fc-30f4ac68a344.png", "1b02eb9e-7603-4405-b0c1-6cb88e1fa4f8.png", "1b0d8998-169e-43d0-8a88-e6b96faa8f35.png", "1b1f7520-b0c7-42c3-a08d-97443ee0093d.png", "1b254af7-de5e-4224-9a18-7d4b7f5b9e31.png", "1b28b463-78b6-4448-95bc-c9054aeb926a.png", "1b292b90-d0ba-4dbf-b4db-f469d55c32f1.png", "1b2b9646-3b57-4e23-bab8-545806362eb8.png", "1b56fecf-b1ff-46e8-803c-7a9ca8782fe6.png", "1b5869f4-d8bb-4b30-95b0-e98f7e11f398.png", "1b5884c2-6543-4acd-88af-bea5487220ac.png", "1b5b7365-9167-4223-a405-38c90031998c.png", "1b651bb8-8c88-424b-be53-3d767c6d5d89.png", "1b68c4df-2058-4d1f-b7f1-1a6303e6f83d.png", "1b6926eb-b3cc-4fa0-b9ec-e9c99ff73854.png", "1b7a9e22-1005-42e3-beec-695be3dc0a64.png", "1b7af62b-76a5-4011-bc77-77c649ed5c22.png", "1b7f1671-1e99-4de5-adba-289439a8a2e2.png", "1b834371-f997-4c30-9172-2a098e6effce.png", "1b84ceb5-822b-4de0-9443-bf7f1ced98ad.png", "1b85886e-b15f-45ca-aa69-51f076f200e5.png", "1bc0b772-f337-4890-88ee-6ccc84a58074.png", "1bddbde4-275b-4b16-9a9a-41163a5f4b6f.png", "1bdf78b3-e1ba-45ab-be15-19b7246bc231.png", "1bf1a658-8486-4740-af83-14c43a830e3d.png", "1bffb0b8-0b44-4e70-8ab8-7b247c05929f.png", "1c08e626-3a53-4063-96bf-edc365d83934.png", "1c0a5f3f-9326-4917-80a3-8a5601d06c11.png", "1c1b5a7d-8d95-41ca-b3c1-587b9d344ec0.png", "1c2f1154-11f5-40d2-8ee6-c55e7d9c01f0.png", "1c351584-89b8-405d-9b9a-19a1e84b3c1f.png", "1c3cd39a-5a5c-4d10-a2eb-fcc2f5b5be06.png", "1c46a654-d76e-4aa3-b1cb-5fdacc87be63.png", "1c488fae-f6e9-41cd-84c2-aaf05c7df550.png", "1c4cadf1-56f0-4f44-96cb-8b16b50e3149.png", "1c6a3da3-bdf9-4639-9911-5d1a6a686206.png", "1c8aa4f6-38c9-4b47-8b61-620452c0adcf.png", "1c9a9ef8-a450-463c-83c4-26be59403985.png", "1c9c8acb-a4c0-438a-a27e-6a2ab47a4470.png", "1c9ec9b8-267c-4417-9c5b-072628997362.png", "1cb3f4c0-e58e-4f5d-88cc-ce1bdc7e743d.png", "1cc28639-5e00-4628-b590-c3460d193be6.png", "1cc76b48-3a6d-4f1e-a84f-b2fce765526c.png", "1d0637e4-f41a-43e8-9b5b-c971d8e7e428.png", "1d13bfa8-5e2b-48f9-9d90-b5fd2ac45775.png", "1d16ac54-17e7-414f-86d9-a030ded66887.png", "1d27b239-df49-403d-8b5a-df6f60f66c45.png", "1d48faad-83e7-4ab7-8145-7772b1fce943.png", "1d4df5fa-20e7-43f2-9475-5568c97a28ad.png", "1d53dd7a-1495-4d98-8515-4d9ee923467e.png", "1d58cf30-b386-4711-9c8e-c880caef7509.png", "1d610f85-f843-40c0-96d5-91745015a7bc.png", "1d75e603-8279-4949-b5cd-ce170d78d154.png", "1d7f0bc4-aa72-4c6d-8fb0-b33d0eb738da.png", "1d844074-dec8-4cbb-b94f-ddbf00f7335b.png", "1d864028-dee6-4e99-8323-b8a54f7e399d.png", "1da5a148-06b6-4965-ad97-dbdaa3fe957e.png", "1da9e699-2056-4f77-9b6b-0af8aeb3a258.png", "1db64ae4-4f50-4a4c-88e6-ddca1c2b01f8.png", "1dc67f91-1470-413c-8a5d-710bb8581304.png", "1de8e358-034a-4e8a-8930-611b826dabce.png", "1e050968-7f8a-4506-a746-357af7c88205.png", "1e0d673c-57eb-4d63-bb54-c7d871d81cee.png", "1e2d9079-0fad-4b15-8b94-080c699e1dc7.png", "1e3e71ed-6fb4-45ed-83e9-cfb7065a3657.png", "1e521333-db14-4a4f-9cc5-1840e97b3984.png", "1e79f38a-2d89-48c4-ba59-68463fbd09bc.png", "1e9fa107-bb18-4b8f-a92d-ac3b2c838b22.png", "1ea2a6b6-f2d6-4157-8b94-05a76b877644.png", "1eaa4366-d330-4645-86b7-31284803e5fe.png", "1ead5b21-39c2-4c25-92f9-f834b228b3ff.png", "1ebedadc-5fe5-40fe-88c5-115e34752341.png", "1ec14405-517f-4153-a448-9dbe232fc849.png", "1ed038ea-daa9-46ae-91d7-5dd331c9c992.png", "1ed378e9-8638-4727-88f0-1bba693fb2d0.png", "1edbbc00-6535-4bbf-b057-3f4070eee7ac.png", "1edf4ccf-adfe-4b65-b9aa-32b213ad0c47.png", "1ee04771-0ea7-4fe8-a303-25e893e696d6.png", "1ee954ff-04bd-4a65-bbbd-5f1501dae6d5.png", "1eec156a-99b0-47d8-8fb4-2ddca5cdac16.png", "1eef3019-4bfe-430f-9c17-181e86d55156.png", "1ef5016f-6f95-475d-be67-edb506bf8953.png", "1f0bfe51-5de5-46aa-9b4a-08d6d15a2c48.png", "1f0c0a71-7ee4-4677-9f33-72dc774b3989.png", "1f10ba0d-75f0-41a2-9c82-5d13551bb766.png", "1f228b88-7e96-4502-b9b5-9f5e619e7098.png", "1f40a37b-8b8c-440c-a9f5-8effba8be531.png", "1f47b4d1-9d49-4de4-82fb-c115a392295c.png", "1f4bc5af-983b-4e04-a43c-3ba971ae78c6.png", "1f592295-c27c-4b8d-b3b4-0ebd87a6895d.png", "1f71c8c9-d7ec-4537-85e3-3b450287642f.png", "1fabb16c-b004-4bcd-9670-90538a3c09b4.png", "1fb49543-0e88-4724-a341-efaf24641016.png", "1fb6501a-2876-4af5-ba93-93f8b30a6b26.png", "1fbaa8df-453f-47f0-8569-b9f320527cf0.png", "1fd52023-a66d-479b-bc26-5a1f97144efc.png", "1fdd6d6b-18bb-4954-a323-a73824369563.png", "1ff8361b-69e3-4516-9408-a0d27480aadb.png", "1ff8615e-b4fe-40b9-bfaf-bee0e151ef97.png", "1ffe673a-14a4-43a7-af91-be88d69d2489.png", "2a053399-e986-48bd-a82e-b272518edc99.png", "2a07ebf1-e46d-4063-a142-e9bd9f6ff92f.png", "2a2016e8-1688-4318-b6c5-79623f431619.png", "2a314b83-f2fa-4f6b-aed2-17183345787e.png", "2a3d3a6b-9cac-413e-a050-a14164e1374c.png", "2a435113-113a-4188-9478-82cb36ca3685.png", "2a47a4dd-1781-40a7-81c3-eba86563b803.png", "2a47c4f9-82a7-40c0-bb38-b97b21f2040d.png", "2a5bb3e8-2b21-457f-a746-0115426715f1.png", "2a660fd7-6474-4d25-82c3-591c15bca9c6.png", "2a665a18-e720-4af9-8c88-34d5b2e6e9d3.png", "2a6b7ace-8087-4755-a0f8-bf662bc81faf.png", "2a83eb1d-168b-40e0-8255-8f1d1dfe3128.png", "2a91ad5e-ab6a-40aa-adfc-543fbb0e6126.png", "2ac6e5a7-1288-43aa-b47b-331c5215e71a.png", "2acf66f0-1601-4df3-a3d0-40b5a240e6d2.png", "2af8077f-5ee9-456c-bcf9-176706717f15.png", "2afd1592-1928-4b46-a10a-c29a61444572.png", "2b0c4985-83a6-4341-a7be-ece1060a3afd.png", "2b1870db-ee33-45fd-a2ea-97f8f9b107e0.png", "2b2da112-b794-4a99-9f1f-0f275182b8f5.png", "2b3d6cc4-731e-4c0a-8186-9136cd59637c.png", "2b452af8-c1c1-4bd6-a53b-c69f048586bb.png", "2b536572-e9e7-486a-96e1-85830c0f25b2.png", "2b80c4ab-6c13-4c83-a2e3-333b3f0fe45f.png", "2b8cf4f6-5cf1-413b-80fb-4e3cedd25243.png", "2b8da8d6-57bb-4244-860a-d29200c82984.png", "2bab7fb6-8b7c-428f-8ded-9061754adef9.png", "2baf6d1e-47e3-4fdb-99cc-c191e8954faf.png", "2bb22401-e06d-4c15-b494-b3c0b05bd65a.png", "2bcb2775-5046-4f13-997b-de17c3df182b.png", "2bcefd77-9107-4755-95b4-44e56f57cc97.png", "2bd1e2ec-536f-49f6-80c5-d38c5aa196a1.png", "2be67141-c49d-4aea-ae4c-d27d1872e7b6.png", "2be6ec53-9ad4-4d54-b0fd-993249ec459d.png", "2bed44f0-d446-48b1-af48-90277806fb5f.png", "2c13391b-ad21-4b16-8f2b-7dcc4d18432b.png", "2c1a056b-9240-4d2e-bf56-6afd5e4d3874.png", "2c1d9fd0-7164-4f35-970b-b3ee421da1cb.png", "2c239940-6163-4161-bf62-f93455b3ddda.png", "2c52ffbb-3af5-43d0-bfbc-c426c17f1f4c.png", "2c751494-0f4e-45c4-af6e-c28a8bf72a72.png", "2c76e534-2b62-4b5f-97db-133167267d5a.png", "2c832f0b-b2e2-45bc-81b2-1f23f8b9d7b9.png", "2c83d36f-2f9f-4e76-a79f-c5f5f179aee7.png", "2c8954d0-9f06-4231-8f46-70c90b9d9db5.png", "2c964e6c-defc-4591-998b-d6131128f1d5.png", "2c9ab847-9c2d-49c2-ad32-bf5da8a41dbc.png", "2c9f842d-72cf-48cb-9373-b99af6e08b74.png", "2ca47de3-a33d-463e-b1b7-c1efef81ccfa.png", "2cc604a0-1897-4353-8cba-85556b5145ac.png", "2cc8b4e6-e800-408d-9dd9-bd5fe969a9ce.png", "2cd05932-b70b-4abd-8b94-0417802c223e.png", "2ce83f92-9d4d-4c8f-9ef3-544dacdb4599.png", "2cf8e550-2dab-432a-b5bb-87c0c7afb5f0.png", "2d157753-3fe7-4f93-9ea4-a3980123930f.png", "2d2590ab-154f-4d7d-827d-0e54362aed87.png", "2d392fde-e8d9-4169-819f-cd570a115f91.png", "2d3dc639-6ba1-495a-91f4-ddbed09363af.png", "2d5333bc-835d-4e5b-9530-372a8f1b1213.png", "2d5e6911-fe4b-4a99-90b6-86c4d2fd6e70.png", "2d6aeea1-f17d-4380-9132-86edc624c21e.png", "2d7db9d1-9a8a-44e0-ab76-554a9b99b061.png", "2d880990-563d-4612-bef1-e8b492f29d1b.png", "2d883e2b-0cfa-46e4-a492-8afa3cf74a7a.png", "2d96cded-4530-484a-bce3-3b395d55e3ce.png", "2da252c2-5a91-44b1-8213-3f699af9531d.png", "2db0266e-4c0e-401d-bab0-c20e61e03566.png", "2dcd96f3-dcef-439e-bf11-76661e992f3b.png", "2dd954c3-9aa5-4e0b-b8b4-143139a7b75c.png", "2deb07a1-9121-4b1b-ba1e-ea95d56159cd.png", "2df6a569-2229-4ca0-9f0a-329a479c974d.png", "2e0eba35-5e71-40a6-99b2-4dc66a32edec.png", "2e260d03-8f2c-4975-bb6d-907b2b1a2a1d.png", "2e29b094-0a04-4a47-872d-e914dcad5ff1.png", "2e3187f4-b7b3-45d8-b58a-aba50551b792.png", "2e3ad641-6a40-4974-946a-b8b36358d8e9.png", "2e3edd25-3fd5-4931-8e71-da73a71049cf.png", "2e49b37d-d320-4f05-9143-f003ca66635f.png", "2e68d85c-3807-4013-91d1-e53d7efe3313.png", "2e8669bf-ebe0-42da-be2b-0d94f9ded9b3.png", "2ecc7e20-9c49-49a4-a1ae-123045426ece.png", "2efc613d-ef3d-4181-9cbd-512d0120569c.png", "2f02ea00-6962-4be4-8d9a-f31dd92d3360.png", "2f1e6fde-9e95-4a33-a234-dccd1673caa3.png", "2f418653-c667-4cd9-a78e-79931b796f6f.png", "2f4418a4-45ce-4e90-a2dd-44d66ab41982.png", "2f65e486-bbe7-41cc-ac3a-51102647c822.png", "2f6fddea-92a6-4fae-85ba-b14c73f6e8e1.png", "2f8900a2-bf83-4a49-9775-515be048b22b.png", "2f946d86-3dda-4dc8-943f-fb033d570a0f.png", "2f98473e-7cad-411c-8def-aa0f58c540b4.png", "2fa081d3-32a7-4c06-8145-9122ea778c71.png", "2feb13b3-d990-4368-88a2-bb0b8a08b462.png", "2ffcaee9-d28e-49c1-ad1a-6d071ea7bd2a.png", "3a12bdcf-2700-40a4-a427-83d077c336ff.png", "3a2e4d16-4a85-4bd7-b0a4-643dfc680602.png", "3a3253cb-a0b0-4bb0-a568-a90235bb48bb.png", "3a376a5b-6b5d-4af8-af6e-1591c2eb2e3b.png", "3a4696ed-8d0e-4ef7-a29a-5bbfbf7ea73e.png", "3a46f826-a0a8-4597-bcdc-d31dd3252b24.png", "3a490a51-42df-46ea-b857-8ab1cb6a78f6.png", "3a4b9e98-fd28-4fc6-b664-10b30a02944a.png", "3a4f0e92-017f-464b-a259-254f560c9341.png", "3a595310-450a-4250-b171-2c0b1fbfe5bb.png", "3a5954a8-21d9-495a-88d3-285a68e632bd.png", "3a59a95d-6cde-4bf6-9fb0-bf006072dcbc.png", "3a8b2410-dac6-490e-8409-f3e56b234b4d.png", "3a8b8dd4-ba39-40b2-8aff-b82f98a1fb96.png", "3a91863f-0113-4adb-b8ce-1440feb7db86.png", "3a946615-185c-4272-b1df-4e52e93240a3.png", "3a9990ab-1d75-4eb7-a70d-d02229c41e35.png", "3ace3b0f-0597-46a7-999e-0bc8c4d28288.png", "3ad07ef1-756b-4e93-afe2-0605dcae6fb7.png", "3ad338c8-899b-47db-9dad-0fbd21938f62.png", "3ae33054-28c2-4e74-b9ff-7510914b8fad.png", "3ae37325-4882-4dcd-b24a-471b8d3bcb0b.png", "3aea317e-cea2-4edf-bda6-c7ab5adc9617.png", "3af3780b-b675-4616-bab8-1bcc92d1bf23.png", "3af94494-13d4-4c1e-8dde-bf397dd6b480.png", "3afc795b-f145-4859-b536-7cfc201d878b.png", "3afd771f-e69d-4b04-8c41-ef18fec09142.png"];
  $scope.markers = [];
  $scope.infoWindows =[];
  $scope.locations = [];

  pusher.bind('new_location', function(data) {
    $scope.locations.push(data);
  });

  var delay = 1
  $scope.$watch('locations', function(newVal, oldVal) {
    // Check diff between oldVal and newVal
    var diff = newVal.slice(oldVal.length, newVal.length);
    if  (diff.length >0) {
      // Iterate over diff and create markers
      $timeout(function() {
        addMarkerAndWindow(diff[0], diff.length);
        delay--;
      }, 3000 * delay++);
    }
  }, true)

  // Display map
  function initialize() {
    var mapOptions = {
      zoom: 5,
      center: us_center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
  }

  function position(latitude, longitude) {
    return new google.maps.LatLng(latitude, longitude)
  }

  function createInfoWindowContent(offer) {
    return [
      "<img src='images/icons/" + $scope.icons[Math.floor(Math.random() * $scope.icons.length)] + "' align='right' height=57 width= 57 style='margin-top:20px; margin-left:5px' >",
      "<strong>Offer:</strong> " + offer.offer_name,
      "<strong>Device Type: </strong>" + offer.device_type ,
      "<strong>Dollar Value: </strong> $" + (offer.revenue),
    ].join('<br>');
  }

  function addMarkerAndWindow(offer) {
    var site = position(offer.latitude, offer.longitude)

    // Add Google Marker using custom icon
    var marker = new google.maps.Marker({
      position: site,
      map: map,
      draggable: true,
      icon: 'images/t_icon.ico',
      animation: google.maps.Animation.DROP,
      visible: true
    });

    $scope.markers.push(marker);

    if ($scope.markers.length >= 11){
      $scope.markers[($scope.markers.length - 11)].setMap(null);
    }

    // Add InfoWindow to map
    var infoWindow = new google.maps.InfoWindow({
      position: site,
      content: createInfoWindowContent(offer),
      zIndex: $scope.locations.length
    });

    infoWindow.open(map);
    $scope.infoWindows.push(infoWindow)

    if ($scope.infoWindows.length >= 11){
      $scope.infoWindows[($scope.infoWindows.length - 11)].close();
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);

});
