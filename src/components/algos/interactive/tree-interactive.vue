<template>
  <div>
    <h1>{{ type }}</h1>
    <tree-core ref="core" :key="type"></tree-core>
    <code-frame :initial-code="initialCode" :key="type" initial-mode="Tree" initial-sample="1,x,2,x,x,3,4" :specific-sample-pattern="/^([0-9x],)*$/" @submitted="run($event,data)"></code-frame>
  </div>
</template>

<script>
import TreeCore from '../animate/tree-core.vue'
import codeFrame from '../../code-frame.vue'
import { useRoute } from "vue-router"
import { ref } from 'vue'


export default {
  name: "tree-interactive",
  setup(){
    const route = useRoute()
    let type = ref(route.params.type)

    let initialCode = "import java.util.List;\n" +
        "import java.util.ArrayList;\n" +
        "\n" +
        "class Main {\n" +
        "    public static List<Integer> preorderTraversal(BinaryTreeNode root) {\n" +
        "        List<Integer> res = new ArrayList<Integer>();\n" +
        "        preorder(root, res);\n" +
        "        return res;\n" +
        "    }\n" +
        "\n" +
        "    public static void preorder(BinaryTreeNode root, List<Integer> res) {\n" +
        "        if (root == null) {\n" +
        "            return;\n" +
        "        }\n" +
        "        res.add(root.getValue());\n" +
        "        preorder(root.left, res);\n" +
        "        preorder(root.right, res);\n" +
        "    }\n" +
        "    \n" +
        "    public static void main(String[] args) {\n" +
        "        BinaryTree binaryTree = new BinaryTree();\n" +
        "        preorderTraversal(binaryTree.getRoot());\n" +
        "        binaryTree.getRoot().insertLeft(777);\n" +
        "        binaryTree.swap(binaryTree.getRoot(),binaryTree.getRoot().right);\n" +
        "        preorderTraversal(binaryTree.root);\n" +
        "        binaryTree.getRoot().removeLeft();\n" +
        "    }\n" +
        "}";
    return{
      type,
      initialCode
    }
  },
  components: {
    TreeCore,
    codeFrame,
  },
  methods:{
    run:function (data){
      const test = [
          "insert(2,2)",
          "insert(4,1)",
          "insert(5,2)"
      ]
      this.$refs.core.setData(data.originData)
      // this.$refs.core.run(data.operations)
      this.$refs.core.run(test)
    },
  }
}
</script>

<style scoped>

</style>