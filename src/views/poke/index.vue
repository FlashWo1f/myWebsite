<template>
	<div class="poke-calculator">
		<!-- 添加标题区域 -->
		<div class="page-header">
			<h1>跑得快计分板</h1>
		</div>
		<a-row class="full-height">
			<!-- 左侧历史记录 -->
			<a-col :span="6" class="history-panel">
				<a-card title="历史记录" :bordered="false" class="custom-card">
					<div class="game-info">
						场次号：{{ gameId }}
					</div>
					<a-list :dataSource="reversedHistory" class="history-list">
						<template #renderItem="{ item, index }">
							<a-list-item style="padding: 0;">
								<div class="history-item">
									<div class="round-title">第{{ history.length - index }}局</div>
									<a-row>
										<a-col :span="8" v-for="(score, pIndex) in item" :key="pIndex" :class="{ 'winner': score === 0 }">
											{{ players[pIndex].name }}: {{ score === 0 ? '赢' : `-${score}` }}
										</a-col>
									</a-row>
								</div>
							</a-list-item>
						</template>
					</a-list>
				</a-card>
			</a-col>

			<!-- 右侧计分面板 -->
			<a-col :span="18" class="main-panel">
				<a-card title="记分板" :bordered="false" class="custom-card">
					<!-- 玩家设置 -->
					<div class="player-settings">
						<a-row :gutter="16">
							<a-col :span="8" v-for="(player, index) in players" :key="index">
								<a-card class="player-card custom-card">
									<a-input :value="player.name" placeholder="输入玩家名称"
										@change="(e) => updatePlayerName(index, e.target.value)" />
									<div class="score-display">
										<span :class="{ 'positive': player.score > 0, 'negative': player.score < 0 }">
											{{ player.score }}分
										</span>
									</div>
								</a-card>
							</a-col>
						</a-row>
					</div>

					<!-- 分数输入 -->
					<div class="score-input">
						<a-form :model="currentRound" layout="vertical">
							<a-row :gutter="16">
								<a-col :span="8" v-for="(_, index) in players" :key="index">
									<a-form-item :label="players[index].name + '的分数'">
										<a-input-number v-model:value="currentRound[index]" :min="0" :max="18" style="width: 100%" />
									</a-form-item>
								</a-col>
							</a-row>
							<div class="action-buttons">
								<a-button type="primary" @click="calculateScore" :disabled="!isValidInput">
									记录本局
								</a-button>
								<a-button @click="undoLastRound" :disabled="history.length === 0">
									撤销上局
								</a-button>
								<a-button danger @click="resetGame">
									重置游戏
								</a-button>
							</div>
						</a-form>
					</div>
				</a-card>
			</a-col>
		</a-row>
		<!-- 添加历史对局概览 -->
		<div class="history-games-overview">
			<a-divider>历史对局记录</a-divider>
			<a-table :dataSource="historyGamesData" :columns="historyColumns" :pagination="{ pageSize: 5 }" size="small">
				<template #bodyCell="{ column, record }">
					<template v-if="column.key === 'action'">
						<a @click="showGameDetail(record)">查看详情</a>
					</template>
				</template>
			</a-table>
		</div>
	</div>
	<!-- 添加详情弹窗 -->
	<a-modal v-model:visible="detailModalVisible" title="对局详情" :footer="null" width="600px">
		<div v-if="selectedGame">
			<div class="game-detail-header">
				<span class="game-id">场次号：{{ selectedGame.gameId }}</span>
				<span class="game-date">{{ formatDate(selectedGame.timestamp) }}</span>
			</div>
			<a-list :dataSource="selectedGame.history" class="game-detail-list">
				<template #renderItem="{ item, index }">
					<a-list-item>
						<div class="history-item">
							<div class="round-title">第{{ index + 1 }}局</div>
							<a-row>
								<a-col :span="8" v-for="(score, pIndex) in item" :key="pIndex" :class="{ 'winner': score === 0 }">
									{{ selectedGame.players[pIndex].name }}: {{ score === 0 ? '赢' : `-${score}` }}
								</a-col>
							</a-row>
						</div>
					</a-list-item>
				</template>
			</a-list>
		</div>
	</a-modal>
</template>

<script>
import { Modal, message } from 'ant-design-vue'
import { h } from 'vue';
const STORAGE_KEY = 'poke_game_current'
const STORAGE_HISTORY_KEY = 'poke_game_history'

export default {
	name: 'PokeCalculator',
	data() {
		return {
			players: [
				{ name: '李斌', score: 0 },
				{ name: '刘雨晴', score: 0 },
				{ name: '张冬香', score: 0 }
			],
			currentRound: [0, 0, 0],
			history: [],
			gameId: this.generateGameId(),
			detailModalVisible: false,
			selectedGame: null,
			historyColumns: [
				{
					title: '场次号',
					dataIndex: 'gameId',
					key: 'gameId',
				},
				{
					title: '玩家成绩',
					dataIndex: 'scores',
					key: 'scores',
					customRender: ({ text, record }) => {
						return h('div', { class: 'player-scores' },
							record.players.map((player, index) => {
								const score = text[index]
								return h('span', {
									class: {
										'score-item': true,
										'score-positive': score > 0,
										'score-negative': score < 0
									}
								}, `${player.name}: ${score >= 0 ? '+' : ''}${score}分；`)
							})
						)
					}
				},
				{
					title: '操作',
					key: 'action',
					width: 100,
					align: 'center',
					customRender: ({ record }) => {
						return h('a', {
							onClick: () => this.showGameDetail(record)
						}, '查看详情')
					}
				}
			]
		}
	},
	computed: {
		isValidInput() {
			const zeroCount = this.currentRound.filter(score => score === 0).length
			const validScores = this.currentRound.every(score =>
				(score === 0 || (score > 0 && score <= 18))
			)
			return zeroCount === 1 && validScores
		},
		reversedHistory() {
			return [...this.history].reverse()
		},
		historyGamesData() {
			const historyGames = this.getHistoryGames()
			return Object.entries(historyGames).map(([gameId, game]) => {
				// 计算每个玩家的总分
				const scores = game.players.map(player => {
					const finalScore = game.history.reduce((total, round) => {
						const playerIndex = game.players.findIndex(p => p.name === player.name)
						if (round[playerIndex] === 0) {
							return total + round.reduce((sum, score) => sum + score, 0)
						} else {
							return total - round[playerIndex]
						}
					}, 0)
					return finalScore
				})

				return {
					key: gameId,
					gameId,
					scores,
					...game
				}
			}).sort((a, b) => b.timestamp - a.timestamp) // 按时间倒序排列
		}
	},
	methods: {
		updatePlayerName(index, newName) {
			this.players[index].name = newName
			this.saveToLocal()
		},

		generateGameId() {
			const date = new Date()
			const dateStr = date.getFullYear().toString().slice(-2) +
				String(date.getMonth() + 1).padStart(2, '0') +
				String(date.getDate()).padStart(2, '0')

			const historyGames = this.getHistoryGames()
			const todayGames = Object.keys(historyGames)
				.filter(id => id.startsWith(dateStr))

			const sequence = String(todayGames.length + 1).padStart(2, '0')
			return dateStr + sequence
		},

		calculateScore() {
			if (!this.isValidInput) {
				this.$message.error('每局必须有且仅有一个赢家（分数为0），其他玩家分数需在1-18之间')
				return
			}

			this.players.forEach((player, index) => {
				if (this.currentRound[index] === 0) {
					player.score += this.currentRound.reduce((sum, score) => sum + score, 0)
				} else {
					player.score -= this.currentRound[index]
				}
			})

			this.history.push([...this.currentRound])
			this.saveToLocal()
			this.currentRound = [0, 0, 0]
		},

		undoLastRound() {
			this.$modal.confirm({
				title: '确认撤销',
				content: '确定要撤销上一局的记录吗？',
				onOk: () => {
					if (this.history.length === 0) return

					const lastRound = this.history.pop()
					this.players.forEach((player, index) => {
						if (lastRound[index] === 0) {
							player.score -= lastRound.reduce((sum, score) => sum + score, 0)
						} else {
							player.score += lastRound[index]
						}
					})

					this.saveToLocal()
				}
			})
		},

		resetGame() {
			this.$modal.confirm({
				title: '确认重置',
				content: '确定要结束当前游戏并开始新的一局吗？当前记录将被保存到历史记录中。',
				onOk: () => {
					this.saveGameToHistory()

					this.players.forEach(player => player.score = 0)
					this.history = []
					this.currentRound = [0, 0, 0]
					this.gameId = this.generateGameId()

					this.saveToLocal()
				}
			})
		},

		saveGameToHistory() {
			if (this.history.length === 0) return

			const historyGames = this.getHistoryGames()
			historyGames[this.gameId] = {
				players: [...this.players],
				history: [...this.history],
				timestamp: new Date().getTime()
			}
			localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(historyGames))
		},

		getHistoryGames() {
			const historyData = localStorage.getItem(STORAGE_HISTORY_KEY)
			return historyData ? JSON.parse(historyData) : {}
		},

		saveToLocal() {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({
				gameId: this.gameId,
				players: this.players,
				history: this.history
			}))
		},

		loadFromLocal() {
			const data = localStorage.getItem(STORAGE_KEY)
			if (data) {
				const parsed = JSON.parse(data)
				this.players = parsed.players
				this.history = parsed.history
				this.gameId = parsed.gameId
			}
		},
		showGameDetail(record) {
			this.selectedGame = record
			this.detailModalVisible = true
		},

		formatDate(timestamp) {
			const date = new Date(timestamp)
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
		}
	},
	mounted() {
		this.loadFromLocal()
	}
}
</script>

<style scoped>
.page-header {
	text-align: center;
	padding: 16px 0 24px;
}

.page-header h1 {
	font-size: 32px;
	font-weight: bold;
	color: #d48806;
	margin: 0;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* 调整整体布局以适应新增的标题 */
.poke-calculator {
	min-height: 100vh;
	padding: 20px;
	background: #fff6e5;
	display: flex;
	flex-direction: column;
}

.full-height {
	flex: 1;
}

/* 调整历史记录列表的最大高度，为标题腾出空间 */
.history-list {
	max-height: calc(100vh - 220px);
	overflow-y: auto;
	padding-right: 8px;
}

.custom-card {
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	transition: all 0.3s ease;
}

.custom-card:hover {
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.history-panel {
	height: 100%;
	overflow-y: auto;
}

.history-list::-webkit-scrollbar {
	width: 6px;
}

.history-list::-webkit-scrollbar-thumb {
	background-color: #d9d9d9;
	border-radius: 3px;
}

.game-info {
	padding: 12px 0;
	margin-bottom: 16px;
	border-bottom: 1px solid #ffe4b5;
	font-weight: bold;
	color: #d48806;
}

.history-item {
	width: 100%;
	padding: 4px;
	background: #fff;
	border-radius: 8px;
	margin-bottom: 8px;
}

.round-title {
	font-weight: bold;
	margin-bottom: 8px;
	color: #d48806;
}

.winner {
	color: #52c41a;
	font-weight: bold;
}

.main-panel {
	padding-left: 20px;
}

.player-settings {
	margin-bottom: 32px;
}

.player-card {
	background: #fff;
	margin-bottom: 16px;
}

.score-display {
	font-size: 28px;
	text-align: center;
	font-weight: bold;
	padding: 16px 0;
}

.positive {
	color: #52c41a;
}

.negative {
	color: #f5222d;
}

.action-buttons {
	display: flex;
	gap: 12px;
	justify-content: center;
	margin-top: 32px;
}

:deep(.ant-card-body) {
	padding: 20px;
}

:deep(.ant-input) {
	border-radius: 8px;
}

:deep(.ant-input-number) {
	border-radius: 8px;
}

:deep(.ant-btn) {
	border-radius: 8px;
	height: 40px;
	padding: 0 24px;
}

.history-games-overview {
	margin-top: 20px;
	padding: 0 20px 20px;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.game-detail-header {
	display: flex;
	justify-content: space-between;
	padding: 12px 0;
	margin-bottom: 16px;
	border-bottom: 1px solid #f0f0f0;
}

.game-id {
	font-weight: bold;
	color: #d48806;
}

.game-date {
	color: #888;
}

.game-detail-list {
	max-height: 400px;
	overflow-y: auto;
}

:deep(.ant-table-small) {
	font-size: 14px;
}

:deep(.ant-table-small .ant-table-thead > tr > th) {
	background: #fff6e5;
}

:deep(.ant-divider-inner-text) {
	color: #d48806;
	font-weight: bold;
}

:deep(.player-scores) {
	display: flex;
	/* flex-direction: column; */
	gap: 4px;
}

:deep(.score-item) {
	padding: 2px 8px;
	border-radius: 4px;
	background: #f5f5f5;
}

:deep(.score-positive) {
	color: #52c41a;
	background: #f6ffed;
	border: 1px solid #b7eb8f;
}

:deep(.score-negative) {
	color: #f5222d;
	background: #fff1f0;
	border: 1px solid #ffa39e;
}

:deep(.ant-table-small) {
	font-size: 14px;
}
</style>